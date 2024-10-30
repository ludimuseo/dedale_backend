enum Role {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  CONTRIBUTOR = 'CONTRIBUTOR',
}

interface User {
  uid: string
  role: Role | null
  email: string | null
  emailVerified: boolean
  displayName: string | null
  photoURL: string | null
}

export { Role, User }
