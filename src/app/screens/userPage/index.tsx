import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import { Settings } from "./Settings";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

  if (!authMember) {
    history.push("/");
    return null;
  }

  return (
    <section className="pb-20 pt-32">
      <div className="container mx-auto grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={
                      authMember?.memberImage
                        ? `${serverApi}/${authMember.memberImage}`
                        : "/icons/default-user.svg"
                    }
                    alt="member"
                    className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-primary p-2 text-white">
                    {authMember?.memberType === MemberType.RESTAURANT ? (
                      <img src="/icons/restaurant.svg" alt="restaurant" className="h-4 w-4" />
                    ) : (
                      <img src="/icons/user-badge.svg" alt="member" className="h-4 w-4" />
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold">{authMember?.memberNick}</p>
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    {authMember?.memberType}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="sm">
                  Edit avatar
                </Button>
                <Button variant="outline" size="sm">
                  View orders
                </Button>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border bg-muted/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Address
                </p>
                <p className="mt-1 text-sm text-foreground">
                  {authMember?.memberAddress || "Not provided"}
                </p>
              </div>
              <div className="rounded-2xl border bg-muted/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Bio
                </p>
                <p className="mt-1 text-sm text-foreground">
                  {authMember?.memberDesc || "Tell us about yourself"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">
              Account settings
            </p>
            <Settings />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">
              Engage
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Favorites", value: "14+" },
                { label: "Rewards", value: "3 free" },
                { label: "Following", value: "8 chefs" },
                { label: "Reviews", value: "21" },
              ].map((card) => (
                <div key={card.label} className="rounded-2xl border bg-muted/40 p-4 text-center">
                  <p className="text-xl font-semibold text-primary">{card.value}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{card.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">
              Follow us
            </p>
            <div className="mt-4 grid grid-cols-4 gap-3 text-muted-foreground">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon) => (
                <button
                  key={Icon.name}
                  className="flex items-center justify-center rounded-full border border-muted-foreground/40 p-3 transition hover:border-primary hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

