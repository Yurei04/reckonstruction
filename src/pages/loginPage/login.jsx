import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginForm({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6 px-4 sm:px-8 md:px-16 lg:px-24", className)} {...props}>
      <Card className="overflow-hidden bg-black/80 text-amber-100 border border-amber-200/10 shadow-xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 bg-black/70 backdrop-blur">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold text-amber-100">Welcome Back</h1>
                <p className="text-sm text-amber-300/80">Login to your reckonStruction account</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-amber-100">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="bg-zinc-900 border border-zinc-700 text-amber-100 placeholder:text-amber-400"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-amber-100">Password</Label>
                  <a href="#" className="text-sm text-amber-400 hover:underline">Forgot?</a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-zinc-900 border border-zinc-700 text-amber-100 placeholder:text-amber-400"
                />
              </div>

              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold">
                <Link href="/homepage">Login</Link>
              </Button>

              <div className="relative text-center text-sm text-amber-300/80 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-amber-200/10">
                <span className="relative z-10 bg-black px-2">Or continue with</span>
              </div>

              <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
                <Button variant="outline" className="w-full bg-zinc-900 border-zinc-700 text-amber-100 hover:bg-zinc-800 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-amber-100">
                    <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z" />
                  </svg>
                  <span className="text-sm">Apple</span>
                </Button>

                <Button variant="outline" className="w-full bg-zinc-900 border-zinc-700 text-amber-100 hover:bg-zinc-800 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-amber-100">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  <span className="text-sm">Google</span>
                </Button>

                <Button variant="outline" className="w-full bg-zinc-900 border-zinc-700 text-amber-100 hover:bg-zinc-800 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-amber-100">
                    <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93" />
                  </svg>
                  <span className="text-sm">Meta</span>
                </Button>
              </div>

              <div className="text-center text-sm text-amber-200">
                Don’t have an account?{" "}
                <a href="/surveyQuestions" className="underline underline-offset-4 hover:text-amber-400">
                  Sign up
                </a>
              </div>
            </div>
          </form>

          <div className="relative hidden md:block bg-black">
            <img
              src="/images/image4.png"
              alt="Login visual"
              className="absolute inset-0 h-full w-full object-cover brightness-50 grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-zinc-400">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline hover:text-amber-300">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-amber-300">Privacy Policy</a>.
      </div>
    </div>
  );
}
