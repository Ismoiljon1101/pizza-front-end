import { useState, useEffect } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Sun, Moon, LogOut, Home, ShoppingBag, HelpCircle, CookingPot, UserCircle } from "lucide-react"
import { useGlobals } from "../../hooks/useGlobals"
import { serverApi } from "../../../lib/config"
import { CartItem } from "../../../lib/types/search"
import Basket from "./Basket"

interface OtherNavbarProps {
  cartItems: CartItem[]
  onAdd: (item: CartItem) => void
  onRemove: (item: CartItem) => void
  onDelete: (item: CartItem) => void
  onDeleteAll: () => void
  setSignupOpen: (isOpen: boolean) => void
  setLoginOpen: (isOpen: boolean) => void
  handleLogoutRequest: () => void
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutRequest,
  } = props
  const { authMember, theme, toggleTheme } = useGlobals()
  const history = useHistory()

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navItems = [
    { label: "Home", to: "/", icon: Home },
    { label: "Products", to: "/products", icon: CookingPot },
    { label: "Orders", to: "/orders", icon: ShoppingBag },
    { label: "My Page", to: "/mypage", icon: UserCircle },
    { label: "Help", to: "/help", icon: HelpCircle },
  ]

  return (
    <header className="fixed top-0 left-0 z-50 w-full pt-2 md:pt-4">
      <div className="mx-auto w-full max-w-7xl px-2 md:px-4">
        <div className="glass flex w-full items-center justify-between gap-2 md:gap-3 rounded-full px-3 py-2 md:px-6 md:py-3">
          <NavLink to="/" className="flex items-center gap-2" onClick={handleNavClick}>
            <img className="w-16 md:w-24 drop-shadow-sm" src="/icons/burak.svg" alt="brand logo" />
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                exact
                to={item.to}
                activeClassName="bg-primary/10 text-primary font-semibold"
                className="rounded-full px-5 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-white/10 hover:text-foreground hover:scale-105"
                onClick={handleNavClick}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="hidden rounded-full hover:bg-white/10 md:flex"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />
            {!authMember ? (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" className="rounded-full hover:bg-white/10" onClick={() => setSignupOpen(true)}>
                  Sign up
                </Button>
                <Button className="rounded-full shadow-lg shadow-primary/20" onClick={() => setLoginOpen(true)}>
                  Login
                </Button>
              </div>
            ) : (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="rounded-full border-2 border-white/20 p-0.5 transition hover:border-primary">
                  <Avatar className="h-7 w-7 md:h-9 md:w-9">
                    <AvatarImage
                      src={
                        authMember?.memberImage
                          ? `${serverApi}/${authMember?.memberImage}`
                          : "/icons/default-user.svg"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass border-none">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={handleLogoutRequest} className="focus:bg-white/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Always Visible */}
      <div
        className="glass fixed bottom-2 left-2 right-2 z-40 flex justify-around rounded-full border border-white/20 px-1 py-2 shadow-2xl md:hidden"
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        {navItems.map((item) => {
          const Icon = item.icon || CookingPot
          return (
            <NavLink
              key={item.to}
              exact
              to={item.to}
              activeClassName="text-primary bg-primary/10"
              className="flex flex-col items-center justify-center gap-0.5 rounded-full p-1.5 text-[10px] font-medium text-muted-foreground transition-all hover:text-primary min-w-[60px]"
              onClick={handleNavClick}
            >
              <Icon className="h-4 w-4" />
              <span className="text-[9px]">{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </header>
  )
}
