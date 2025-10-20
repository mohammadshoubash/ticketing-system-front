import LoginPartials from "./LoginPartials"

export default function Navbar() {
    return (
      <nav class="relative bg-white">
        <div class="mx-auto px-2 sm:px-6 lg:px-8" style={{maxWidth: '1580px'}}>
          <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button type="button" command="--toggle" commandfor="mobile-menu" className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-green-500">
                <span class="absolute -inset-0.5"></span>
                <span class="sr-only">Open main menu</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 in-aria-expanded:hidden">
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 not-in-aria-expanded:hidden">
                  <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex shrink-0 items-center">
                <a href="/"><img src="/src/assets/images/logo.png" alt="Extensya logo" class="h-8 w-auto" /></a>
              </div>
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <a href="/" aria-current="page" class="rounded-md px-3 py-2 text-sm font-medium text-white btn-active">Dashboard</a>
                  <a href="/create-ticket" class="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-700">Create Ticket</a>
                  {/* <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-700">Projects</a>
                  <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-700">Calendar</a> */}
                </div>
              </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <LoginPartials />
            </div>
          </div>
        </div>
      </nav>
    )
}