import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  colors?: string[]
  isNew?: boolean
}

export function ProductCard({ id, name, price, image, category, colors, isNew }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          {isNew && <Badge className="absolute left-3 top-3 z-10 bg-primary">New</Badge>}
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="mb-1">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">{name}</h3>
        </Link>
        <p className="text-2xl font-bold text-primary">${price.toFixed(2)}</p>

        {colors && colors.length > 0 && (
          <div className="flex gap-1.5 mt-3">
            {colors.slice(0, 5).map((color, index) => (
              <div
                key={index}
                className="h-5 w-5 rounded-full border-2 border-border"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {colors.length > 5 && (
              <span className="text-xs text-muted-foreground self-center">+{colors.length - 5}</span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          Customize Now
        </Button>
      </CardFooter>
    </Card>
  )
}
