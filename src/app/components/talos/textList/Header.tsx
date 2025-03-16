interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="navbar mb-4 rounded-xl bg-base-100 shadow-xl">
      <h1 className="p-4 font-inclusive text-4xl">{title}</h1>
    </div>
  )
}
