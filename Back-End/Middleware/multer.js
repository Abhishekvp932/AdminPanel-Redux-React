const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $push: { profilePic: file.filename } },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    return res.status(200).json({ msg: 'Profile updated successfully', user: updateUser });
  } catch (error) {
    console.error('Profile updating error:', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};
