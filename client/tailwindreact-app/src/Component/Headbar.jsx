function Headbar() {
  return (
    <div className="mb-16 text-gray-700 ">
      <div className="fixed top-0 flex flex-row w-screen py-5 bg-white">
        <a href="/posts" className="pl-10 text-lg">Posts</a>
        <a href="/twitsupport" className="pl-10 text-lg">Create Tweet</a>
      </div>
    </div>
  );
}
export default Headbar;
