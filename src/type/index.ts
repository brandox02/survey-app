
type User = {
   password: string
   lastname: string
   id: number,
   firstname: string
   email: string
}

export type LocalStorageAuthData = {
   user: User
   accessToken: string
}

export type Pagination<T> = {
   metadata: {
      totalPages: number
      totalItems: number
      perPage: number
   }
   items: Array<T>
}

export type Survey = {
   enabled: boolean;
   id: number
   content: Array<any>,
   answers: Array<any>,
   title: string
   user: {
      id: 1,
      firstname: string
      lastname: string
      email: string
   }
}
