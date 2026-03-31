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

Group.hasMany(Post, { foreignKey: 'groupId' });
Post.belongsTo(Group, { foreignKey: 'groupId' });

User.hasMany(Connection, { foreignKey: 'senderId', as: 'sentConnections' });
User.hasMany(Connection, { foreignKey: 'receiverId', as: 'receivedConnections' });
Connection.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Connection.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

User.hasMany(Discussion, { foreignKey: 'authorId' });
Discussion.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Discussion.hasMany(Comment, { foreignKey: 'discussionId' });
Comment.belongsTo(Discussion, { foreignKey: 'discussionId' });

User.hasMany(Article, { foreignKey: 'authorId' });
Article.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

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
};
