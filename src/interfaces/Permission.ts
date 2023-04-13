
interface Permission {
  [permissionName: string]: {
    create: boolean,
    update: boolean,
    read: boolean,
    delete: boolean
  }
}

export default Permission