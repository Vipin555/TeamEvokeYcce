import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Navigation() {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="text-xl font-bold">Evoke</a>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link href="/">
                <a className="text-sm font-medium">Home</a>
              </Link>
              <Link href="/dashboard">
                <a className="text-sm font-medium">Dashboard</a>
              </Link>
              <Link href="/market">
                <a className="text-sm font-medium">Market</a>
              </Link>
              <Link href="/stocks">
                <a className="text-sm font-medium">Stocks</a>
              </Link>
              <Link href="/about">
                <a className="text-sm font-medium">About</a>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                className="pl-9 w-[250px]"
                placeholder="Search for stocks and more..."
              />
            </div>
            
            <Button
              variant="ghost"
              className="rounded-full w-8 h-8 p-0"
            >
              <span className="sr-only">Profile</span>
              <img
                alt="Avatar"
                className="rounded-full"
                height="32"
                src="https://ui-avatars.com/api/?name=User"
                width="32"
              />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
