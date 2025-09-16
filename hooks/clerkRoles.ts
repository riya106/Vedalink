import { auth } from '@clerk/nextjs/server'

export const checkRole = 
/**
 * 
 * @param { Roles } role 
 * @returns 
 */
async ( role : string ) => {
  const { sessionClaims } = await auth();
  const metadata : any = sessionClaims?.metadata;
  return metadata.role === role
}