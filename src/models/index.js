import sequelize from '../config/database.js';

import UserModel from './User.js';
import MessageModel from './Message.js';
import PostModel from './Post.js';
import CommentModel from './Comment.js';
import LikeModel from './Like.js';
import GroupModel from './Group.js';
import GroupMemberModel from './GroupMember.js';
import ConnectionModel from './Connection.js';
import DiscussionModel from './Discussion.js';
import DiscussionReplyModel from './discussionReply.js';
import ArticleModel from './Article.js';
import NotificationModel from './Notification.js';
import InterestModel from './Interest.js';
import UserInterestModel from './UserInterest.js';
import SavedContentModel from './SavedContent.js';
import UserSettingsModel from './UserSettings.js';

/* =========================
   INIT MODELS
========================= */

const User = UserModel(sequelize);
const Message = MessageModel(sequelize);
const Post = PostModel(sequelize);
const Comment = CommentModel(sequelize);
const Like = LikeModel(sequelize);
const Group = GroupModel(sequelize);
const GroupMember = GroupMemberModel(sequelize);
const Connection = ConnectionModel(sequelize);
const Discussion = DiscussionModel(sequelize);
const DiscussionReply = DiscussionReplyModel(sequelize);
const Article = ArticleModel(sequelize);
const Notification = NotificationModel(sequelize);
const Interest = InterestModel(sequelize);
const UserInterest = UserInterestModel(sequelize);
const SavedContent = SavedContentModel(sequelize);
const UserSettings = UserSettingsModel(sequelize);

/* =========================
   ASSOCIATIONS
========================= */

// Messages
User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'recipientId', as: 'receivedMessages' });

Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });

// Posts
User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// COMMENTS

User.hasMany(Comment, {
  foreignKey: 'authorId',
});

Comment.belongsTo(User, {
  foreignKey: 'authorId',
  as: 'author',
});

// Likes
User.hasMany(Like, {
  foreignKey: 'userId',
});

Like.belongsTo(User, {
  foreignKey: 'userId',
});

// Groups
Group.belongsTo(User, { foreignKey: 'createdBy', as: 'owner' });
User.hasMany(Group, { foreignKey: 'createdBy', as: 'ownedGroups' });

// Group Members
User.hasMany(GroupMember, { foreignKey: 'userId' });
GroupMember.belongsTo(User, { foreignKey: 'userId' });

Group.hasMany(GroupMember, { foreignKey: 'groupId' });
GroupMember.belongsTo(Group, { foreignKey: 'groupId' });

// Connections
User.hasMany(Connection, { foreignKey: 'senderId', as: 'sentConnections' });
User.hasMany(Connection, { foreignKey: 'recipientId', as: 'receivedConnections' });

Connection.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Connection.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });

// Discussions
User.hasMany(Discussion, { foreignKey: 'authorId' });
Discussion.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Group.hasMany(Discussion, { foreignKey: 'groupId' });
Discussion.belongsTo(Group, { foreignKey: 'groupId' });

// Discussion Replies
Discussion.hasMany(DiscussionReply, { foreignKey: 'discussionId' });
DiscussionReply.belongsTo(Discussion, { foreignKey: 'discussionId' });

User.hasMany(DiscussionReply, { foreignKey: 'authorId' });
DiscussionReply.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// Articles
User.hasMany(Article, { foreignKey: 'authorId' });
Article.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// Notifications
User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

// Interests
User.hasMany(UserInterest, { foreignKey: 'userId', as: 'userInterests' });
UserInterest.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Interest.hasMany(UserInterest, { foreignKey: 'interestId', as: 'interestLinks' });
UserInterest.belongsTo(Interest, { foreignKey: 'interestId', as: 'interest' });

User.belongsToMany(Interest, {
  through: UserInterest,
  foreignKey: 'userId',
  as: 'interests',
});

Interest.belongsToMany(User, {
  through: UserInterest,
  foreignKey: 'interestId',
  as: 'users',
});

// Saved Content (ONLY user relation)
User.hasMany(SavedContent, { foreignKey: 'userId' });
SavedContent.belongsTo(User, { foreignKey: 'userId' });

// User Settings
User.hasOne(UserSettings, { foreignKey: 'userId' });
UserSettings.belongsTo(User, { foreignKey: 'userId' });

// Nested Comments
Comment.hasMany(Comment, { foreignKey: 'parentId', as: 'replies' });
Comment.belongsTo(Comment, { foreignKey: 'parentId', as: 'parent' });

/* =========================
   EXPORTS
========================= */

export {
  sequelize,
  User,
  Message,
  Post,
  Comment,
  Like,
  Group,
  GroupMember,
  Connection,
  Discussion,
  DiscussionReply,
  Article,
  Notification,
  Interest,
  UserInterest,
  SavedContent,
  UserSettings,
};