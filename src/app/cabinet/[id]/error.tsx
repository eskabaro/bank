'use client'

const Error = ({
   error,
   reset
}: {
   error: Error,
   reset: () => void
}) => {
   return (
      <div>
         <h2>Something went wrong!</h2>
         <span>{error.message}</span>
         <button
            onClick={
               () => reset()
            }
         >
            Try again
         </button>
      </div>
   )
}

export default Error