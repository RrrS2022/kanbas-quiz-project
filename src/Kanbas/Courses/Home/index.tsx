import ModuleList from "../Modules/List";
import CourseStatus from "../Status";
function Home() {
  return (
    <div className="row">
      <div className="col-md-8">
      <h2>Home</h2>
      <ModuleList />
      </div>
      <div className="col-md-4">
        <CourseStatus />
      </div>
    </div>
  );
}
export default Home;