import { useGlobals } from "../../hooks/useGlobals";
import { MemberUpdateInput } from "../../../lib/types/member";
import { useState } from "react";
import { T } from "../../../lib/types/common";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { UploadCloud } from "lucide-react";

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-user.svg"
  );
  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>({
    memberNick: authMember?.memberNick,
    memberPhone: authMember?.memberPhone,
    memberAddress: authMember?.memberAddress,
    memberDesc: authMember?.memberDesc,
    memberImage: authMember?.memberImage,
  });

  /**HANDLERS**/

  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberDescHandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        !memberUpdateInput.memberNick ||
        !memberUpdateInput.memberPhone ||
        !memberUpdateInput.memberAddress ||
        !memberUpdateInput.memberDesc
      ) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();

      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);

      await sweetTopSuccessAlert("Modified successfully", 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileType = file.type,
      validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      memberUpdateInput.memberImage = file;
      setMemberUpdateInput({ ...memberUpdateInput });
      setMemberImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 rounded-3xl border bg-card p-6 shadow-sm md:flex-row">
        <div className="flex items-center gap-4">
          <img
            src={memberImage}
            alt="member"
            className="h-24 w-24 rounded-2xl object-cover"
          />
          <div>
            <p className="font-semibold">Upload image</p>
            <p className="text-sm text-muted-foreground">
              JPG, JPEG, PNG formats only.
            </p>
            <Button
              variant="outline"
              className="mt-3 flex items-center gap-2"
              asChild
            >
              <label className="cursor-pointer">
                <UploadCloud className="h-4 w-4" />
                Choose file
                <input type="file" hidden onChange={handleImageViewer} />
              </label>
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Username</label>
          <Input
            type="text"
            value={memberUpdateInput.memberNick}
            onChange={memberNickHandler}
            placeholder="Enter your username"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input
              type="text"
              value={memberUpdateInput.memberPhone}
              onChange={memberPhoneHandler}
              placeholder="Your phone number"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <Input
              type="text"
              value={memberUpdateInput.memberAddress}
              onChange={memberAddressHandler}
              placeholder="Delivery address"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={memberUpdateInput.memberDesc}
            onChange={memberDescHandler}
            placeholder="Tell us something about yourself"
            className="min-h-[150px]"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmitButton}>Save changes</Button>
      </div>
    </div>
  );
}

