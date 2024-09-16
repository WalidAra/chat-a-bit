import {
  deleteUser,
  getUserBlockedList,
  getUserChats,
  getUserFriendRequests,
  getUserFriends,
  getUserPendingRequests,
  getUserProfile,
  searchUsers,
} from "@/core/controllers";

import express from "express";
const router = express.Router();

router.get("/profile", getUserProfile);
router.delete("/delete", deleteUser);
router.get("/search", searchUsers);
router.get("/chats", getUserChats);
router.get("/friends", getUserFriends);

router.get("/blocked", getUserBlockedList);
router.get("/requests", getUserFriendRequests);
router.get("/pending", getUserPendingRequests);

export default router;
