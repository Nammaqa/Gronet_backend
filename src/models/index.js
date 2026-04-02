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
import ArticleModel from './Article.js';
import NotificationModel from './Notification.js';
import InterestModel from './Interest.js';
import UserInterestModel from './UserInterest.js';
import SavedContentModel from './SavedContent.js';
import UserSettingsModel from './UserSettings.js';

const User = UserModel(sequelize);
const Message = MessageModel(sequelize);
const Post = PostModel(sequelize);
const Comment = CommentModel(sequelize);
const Like = LikeModel(sequelize);
const Group = GroupModel(sequelize);
const GroupMember = GroupMemberModel(sequelize);
const Connection = ConnectionModel(sequelize);
const Discussion = DiscussionModel(sequelize);
const Article = ArticleModel(sequelize);
const Notification = NotificationModel(sequelize);
const Interest = InterestModel(sequelize);
const UserInterest = UserInterestModel(sequelize);
const SavedContent = SavedContentModel(sequelize);
const UserSettings = UserSettingsModel(sequelize);

// Define associations
User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'recipientId', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });

User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Comment, { foreignKey: 'authorId' });
Comment.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Like, { foreignKey: 'userId' });
Like.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

Post.hasMany(Like, { foreignKey: 'postId' });
Like.belongsTo(Post, { foreignKey: 'postId' });

Group.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
User.hasMany(Group, { foreignKey: 'ownerId', as: 'ownedGroups' });

User.hasMany(GroupMember, { foreignKey: 'userId' });
GroupMember.belongsTo(User, { foreignKey: 'userId' });

Group.hasMany(GroupMember, { foreignKey: 'groupId' });
GroupMember.belongsTo(Group, { foreignKey: 'groupId' });

User.hasMany(Connection, { foreignKey: 'senderId', as: 'sentConnections' });
User.hasMany(Connection, { foreignKey: 'recipientId', as: 'receivedConnections' });

Connection.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Connection.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });

User.hasMany(Discussion, { foreignKey: 'authorId' });
Discussion.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Group.hasMany(Discussion, { foreignKey: 'groupId' });
Discussion.belongsTo(Group, { foreignKey: 'groupId' });

Discussion.hasMany(Comment, { foreignKey: 'discussionId' });
Comment.belongsTo(Discussion, { foreignKey: 'discussionId' });

User.hasMany(Article, { foreignKey: 'authorId' });
Article.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(UserInterest, { foreignKey: 'userId' });
UserInterest.belongsTo(User, { foreignKey: 'userId' });
Interest.hasMany(UserInterest, { foreignKey: 'interestId' });
UserInterest.belongsTo(Interest, { foreignKey: 'interestId' });

User.hasMany(SavedContent, { foreignKey: 'userId' });
SavedContent.belongsTo(User, { foreignKey: 'userId' });
Post.hasMany(SavedContent, { foreignKey: 'postId', as: 'savedBy' });
SavedContent.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Article.hasMany(SavedContent, { foreignKey: 'articleId', as: 'savedBy' });
SavedContent.belongsTo(Article, { foreignKey: 'articleId', as: 'article' });

User.hasOne(UserSettings, { foreignKey: 'userId' });
UserSettings.belongsTo(User, { foreignKey: 'userId' });

Comment.hasMany(Comment, { foreignKey: 'parentId', as: 'replies' });
Comment.belongsTo(Comment, { foreignKey: 'parentId', as: 'parent' });

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
  Article,
  Notification,
  Interest,
  UserInterest,
  SavedContent,
  UserSettings,
};
