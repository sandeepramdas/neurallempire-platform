import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#2563eb] text-white hover:bg-[#1d4ed8] active:bg-[#1e40af] shadow-md hover:shadow-lg",
        secondary:
          "bg-[#f3f4f6] text-[#111827] hover:bg-[#e5e7eb] active:bg-[#d1d5db]",
        outline:
          "border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#eff6ff] active:bg-[#dbeafe]",
        ghost:
          "hover:bg-[#f3f4f6] hover:text-[#111827]",
        link:
          "text-[#2563eb] underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] text-white hover:from-[#1d4ed8] hover:to-[#0284c7] shadow-md hover:shadow-xl",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6 py-2",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
