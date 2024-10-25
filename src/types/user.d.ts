enum Role {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  CONTRIBUTOR = 'CONTRIBUTOR',
}

interface UserType {
  uid: string
  displayName: string | null
  email: string | null
  emailVerified: boolean
  photoURL: string | null

  // username: string
  // role: string
  // isAdmin: boolean
}

export { Role, UserType }
