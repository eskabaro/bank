import type { User } from "@/interfaces/data"

export const FriendsUtils = {
   addNewFriend(user: User) {
      const storage = localStorage.getItem('friends')

      if (storage) {
         const friendsArray = JSON.parse(storage);
         const filterUser = friendsArray.find((e: User) => e.id === user.id)
         if (!filterUser) friendsArray.push(user)
         const updatedStorage = JSON.stringify(friendsArray);
         localStorage.setItem('friends', updatedStorage);
      } else {
         const friendsArray = [user];
         const updatedStorage = JSON.stringify(friendsArray);
         localStorage.setItem('friends', updatedStorage);
      }
   }
}