enum Role {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  CONTRIBUTOR = 'CONTRIBUTOR',
}

interface User {
  uuid: number
  role: Role
  username: string
  email: string
}

export { Role, User }
