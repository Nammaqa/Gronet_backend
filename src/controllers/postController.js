// import * as postService from '../services/postService.js';

// export const createPostController = async (req, res) => {
//   try {
//     const post = await postService.createPost(req.user.id, req.body);

//     res.status(201).json({
//       success: true,
//       data: post,
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getFeedController = async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;

//     const result = await postService.getFeed(
//       req.user.id,
//       parseInt(page),
//       parseInt(limit)
//     );

//     res.json({
//       success: true,
//       ...result,
//     });

//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getPostController = async (req, res) => {
//   try {
//     const post = await postService.getPostById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ success: false });
//     }

//     res.json({ success: true, data: post });

//   } catch {
//     res.status(500).json({ success: false });
//   }
// };

// export const updatePostController = async (req, res) => {
//   try {
//     const post = await postService.updatePost(
//       req.params.id,
//       req.user.id,
//       req.body
//     );

//     res.json({ success: true, data: post });

//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// export const deletePostController = async (req, res) => {
//   try {
//     await postService.deletePost(req.params.id, req.user.id);

//     res.json({ success: true, message: 'Deleted successfully' });

//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };



import * as postService from '../services/postService.js';

export const createPostController = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Post data is required',
      });
    }

    const post = await postService.createPost(req.user.id, req.body);

    return res.status(201).json({
      success: true,
      data: post,
    });

  } catch (error) {
    console.error("CREATE POST ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        error: error.originalError || error.message,
      }),
    });
  }
};


export const getFeedController = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await postService.getFeed(
      req.user.id,
      parseInt(page),
      parseInt(limit)
    );

    return res.json({
      success: true,
      ...result,
    });

  } catch (error) {
    console.error("GET FEED ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        error: error.originalError || error.message,
      }),
    });
  }
};


export const getPostController = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: 'Post ID is required',
      });
    }

    const post = await postService.getPostById(postId);

    return res.json({
      success: true,
      data: post,
    });

  } catch (error) {
    console.error("GET POST ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        error: error.originalError || error.message,
      }),
    });
  }
};


export const updatePostController = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: 'Post ID is required',
      });
    }

    const post = await postService.updatePost(
      postId,
      req.user.id,
      req.body
    );

    return res.json({
      success: true,
      data: post,
    });

  } catch (error) {
    console.error("UPDATE POST ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        error: error.originalError || error.message,
      }),
    });
  }
};


export const deletePostController = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: 'Post ID is required',
      });
    }

    const result = await postService.deletePost(postId, req.user.id);

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("DELETE POST ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        error: error.originalError || error.message,
      }),
    });
  }
};