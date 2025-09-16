import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', paddingTop: '5%' }}>
    <SignIn 
      appearance={{
        elements: {
          footer: {
            display: 'none',
          },
        },
        layout: {
          socialButtonsPlacement: 'top',
          socialButtonsVariant: 'blockButton',
        },
        variables: {
          colorPrimary: '#2E8A57',
          colorText: '#384347',
        },
      }}
    />
    </div>
  )
}