import './globals.css'

export const metadata = {
  title: 'Yoga com Gatinhos - Ronron Cat Café',
  description: 'Agende sua aula de yoga com gatinhos',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-ronron-cream">{children}</body>
    </html>
  )
}
