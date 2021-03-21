import styles from "../styles/Notify.module.css";

const Notify = () => {
  // const {
  // show = true,
  //   message = "something went wrong",
  //   duration,
  //   type = "error",
  // } = useSelector((state) => state.notify);
  const show = false;
  const message = "Something went wrong!";
  const type = "error";
  // const dispatch = useDispatch();

  const getBG = () => {
    switch (type) {
      case "success":
        return "#00af91";
      case "error":
        return "#e43f5a";
      case "info":
        return "#51c2d5";
      default:
        return "#e43f5a";
    }
  };

  return (
    <div
      className={`absolute bottom-4 transition-all flex px-3 py-1 rounded justify-center items-center ${styles.notify}`}
      style={{ background: getBG() }}
    >
      <p className="text-white font-semibold">{message}</p>
    </div>
  );
};
export default Notify;
