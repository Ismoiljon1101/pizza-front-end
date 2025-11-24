import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { MapPin, User, CreditCard, Settings as SettingsIcon } from "lucide-react";

export default function MyPage() {
    const history = useHistory();
    const { authMember } = useGlobals();

    if (!authMember) {
        history.push("/");
        return null;
    }

    return (
        <div className="relative min-h-screen pt-2 md:pt-20 pb-20 md:pb-16">
            {/* Background Elements */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-[100px]" />
            </div>

            <section className="container mx-auto px-2 md:px-4">
                <div className="glass rounded-xl md:rounded-[2rem] lg:rounded-[3rem] p-2 md:p-8 lg:p-12 relative overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

                    <div className="relative z-10 space-y-3 md:space-y-6 lg:space-y-10">
                        <div className="text-center">
                            <p className="text-[9px] md:text-xs lg:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary font-bold">
                                My Account
                            </p>
                            <h1 className="mt-1 md:mt-2 lg:mt-3 text-lg md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight">
                                Profile Overview
                            </h1>
                            <p className="mt-1 md:mt-2 lg:mt-3 text-[10px] md:text-sm lg:text-lg text-muted-foreground">
                                View your profile and manage payment methods
                            </p>
                        </div>

                        <div className="grid gap-3 md:gap-6 lg:gap-8 lg:grid-cols-2">
                            {/* User Profile Card */}
                            <div className="glass-panel rounded-lg md:rounded-2xl lg:rounded-3xl p-3 md:p-6 lg:p-8">
                                <div className="flex flex-col items-center gap-2 md:gap-4 lg:gap-6 text-center">
                                    <div className="relative">
                                        <img
                                            src={
                                                authMember?.memberImage
                                                    ? `${serverApi}/${authMember.memberImage}`
                                                    : "/icons/default-user.svg"
                                            }
                                            className="h-14 w-14 md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-full border-2 md:border-4 border-white/20 object-cover shadow-xl"
                                            alt={authMember?.memberNick}
                                        />
                                        <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 rounded-full bg-primary p-1 md:p-2 lg:p-3 shadow-lg">
                                            <img
                                                src={
                                                    authMember?.memberType === MemberType.RESTAURANT
                                                        ? "/icons/restaurant.svg"
                                                        : "/icons/user-badge.svg"
                                                }
                                                className="h-2.5 w-2.5 md:h-4 md:w-4 lg:h-6 lg:w-6"
                                                alt="member type"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-0.5 md:space-y-1 lg:space-y-2">
                                        <p className="text-sm md:text-xl lg:text-2xl font-bold">{authMember?.memberNick}</p>
                                        <p className="text-[8px] md:text-xs lg:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary font-semibold">
                                            {authMember?.memberType}
                                        </p>
                                    </div>

                                    <div className="w-full space-y-1.5 md:space-y-3 lg:space-y-4 pt-2 md:pt-4 border-t border-white/10">
                                        <div className="flex items-start gap-2 md:gap-3 text-left">
                                            <MapPin className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-primary flex-shrink-0 mt-0.5" />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-[7px] md:text-[10px] lg:text-xs uppercase tracking-wider text-muted-foreground/70">Address</p>
                                                <p className="text-[9px] md:text-xs lg:text-sm text-foreground break-words">
                                                    {authMember?.memberAddress || "No address provided"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2 md:gap-3 text-left">
                                            <User className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-primary flex-shrink-0 mt-0.5" />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-[7px] md:text-[10px] lg:text-xs uppercase tracking-wider text-muted-foreground/70">Phone</p>
                                                <p className="text-[9px] md:text-xs lg:text-sm text-foreground break-words">
                                                    {authMember?.memberPhone || "No phone provided"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full rounded-lg md:rounded-xl shadow-lg shadow-primary/20 mt-2 md:mt-4 h-8 md:h-11 lg:h-12 text-[10px] md:text-sm"
                                        onClick={() => history.push("/member-page")}
                                    >
                                        <SettingsIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                                        Edit Profile Settings
                                    </Button>
                                </div>
                            </div>

                            {/* Payment Method Card */}
                            <div className="glass-panel rounded-lg md:rounded-2xl lg:rounded-3xl p-3 md:p-6 lg:p-8">
                                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4 lg:mb-6">
                                    <CreditCard className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-primary" />
                                    <h3 className="text-sm md:text-xl lg:text-2xl font-bold">Payment method</h3>
                                </div>

                                <div className="space-y-2 md:space-y-3 lg:space-y-4">
                                    <Input
                                        placeholder="Card number"
                                        className="glass-input h-8 md:h-11 lg:h-12 rounded-lg md:rounded-xl text-[10px] md:text-sm lg:text-base"
                                    />
                                    <div className="grid gap-2 md:gap-3 lg:gap-4 grid-cols-2">
                                        <Input
                                            placeholder="07/24"
                                            className="glass-input h-8 md:h-11 lg:h-12 rounded-lg md:rounded-xl text-[10px] md:text-sm lg:text-base"
                                        />
                                        <Input
                                            placeholder="Card CVC"
                                            className="glass-input h-8 md:h-11 lg:h-12 rounded-lg md:rounded-xl text-[10px] md:text-sm lg:text-base"
                                        />
                                    </div>
                                    <Input
                                        placeholder="Full name"
                                        className="glass-input h-8 md:h-11 lg:h-12 rounded-lg md:rounded-xl text-[10px] md:text-sm lg:text-base"
                                    />
                                </div>

                                <div className="mt-3 md:mt-6 lg:mt-8">
                                    <p className="text-[9px] md:text-xs lg:text-sm text-muted-foreground mb-2 md:mb-3 lg:mb-4">Accepted payment methods</p>
                                    <div className="grid grid-cols-4 gap-1.5 md:gap-2 lg:gap-3">
                                        {["paypal-card", "master-card", "western-card", "visa-card"].map(
                                            (card) => (
                                                <div
                                                    key={card}
                                                    className="flex items-center justify-center rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 p-2 md:p-3 lg:p-4 transition-colors border border-white/10"
                                                >
                                                    <img
                                                        src={`/icons/${card}.svg`}
                                                        alt={card}
                                                        className="h-3 md:h-5 lg:h-6 object-contain"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                <Button
                                    className="w-full rounded-lg md:rounded-xl shadow-lg shadow-primary/20 mt-2 md:mt-4 lg:mt-6 h-8 md:h-11 lg:h-12 text-[10px] md:text-sm"
                                    variant="outline"
                                >
                                    Save Payment Method
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
