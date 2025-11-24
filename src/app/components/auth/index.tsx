import React, { useState } from "react";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalShell({ open, onClose, children }: ModalShellProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        role="presentation"
      />
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border bg-card shadow-2xl">
        {children}
      </div>
    </div>
  );
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/
  const handleUserName = (e: T) => {
    setMemberNick(e.target.value);
  };

  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };

  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

  const resetFields = () => {
    setMemberNick("");
    setMemberPhone("");
    setMemberPassword("");
  };

  const handleSignupRequest = async () => {
    try {
      const isfulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isfulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      setAuthMember(result);
      resetFields();
      handleSignupClose();
    } catch (err) {
      console.log(err);
      resetFields();
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isfulfill = memberNick !== "" && memberPassword !== "";
      if (!isfulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      setAuthMember(result);
      resetFields();
      handleLoginClose();
    } catch (err) {
      console.log(err);
      resetFields();
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <>
      <ModalShell open={signupOpen} onClose={handleSignupClose}>
        <div className="grid gap-0 md:grid-cols-2">
          <img
            src={"/img/auth.webp"}
            alt="signup"
            className="hidden h-full w-full object-cover md:block"
          />
          <div className="space-y-4 p-8">
            <h2 className="text-2xl font-semibold">Signup Form</h2>
            <Input
              placeholder="Username"
              value={memberNick}
              onChange={handleUserName}
            />
            <Input
              placeholder="Phone number"
              value={memberPhone}
              onChange={handlePhone}
            />
            <Input
              type="password"
              placeholder="Password"
              value={memberPassword}
              onChange={handlePassword}
              onKeyDown={handlePasswordKeyDown}
            />
            <Button className="w-full" onClick={handleSignupRequest}>
              Signup
            </Button>
          </div>
        </div>
      </ModalShell>

      <ModalShell open={loginOpen} onClose={handleLoginClose}>
        <div className="grid gap-0 md:grid-cols-2">
          <img
            src={"/img/auth.webp"}
            alt="login"
            className="hidden h-full w-full object-cover md:block"
          />
          <div className="space-y-4 p-8">
            <h2 className="text-2xl font-semibold">Login Form</h2>
            <Input
              placeholder="Username"
              value={memberNick}
              onChange={handleUserName}
            />
            <Input
              type="password"
              placeholder="Password"
              value={memberPassword}
              onChange={handlePassword}
              onKeyDown={handlePasswordKeyDown}
            />
            <Button className="w-full" onClick={handleLoginRequest}>
              Login
            </Button>
          </div>
        </div>
      </ModalShell>
    </>
  );
}

