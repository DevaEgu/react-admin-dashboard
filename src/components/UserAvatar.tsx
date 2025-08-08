export const UserAvatar = ({
  user,
}: {
  user: { image?: string; fullName?: string };
}) => {
  const firstLetter = user?.fullName?.charAt(0).toUpperCase() || "U";

  const hasValidImage = user?.image && user.image.includes("image");

  return hasValidImage ? (
    <img
      src={user.image}
      alt={user.fullName || "User"}
      className="w-8 h-8 rounded-full"
    />
  ) : (
    <div
      className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold"
      title={user.fullName || "User"}
    >
      {firstLetter}
    </div>
  );
};
