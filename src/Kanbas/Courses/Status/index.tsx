function CourseStatus() {
    return (
        <div className="flex-grow-0 me-2 d-lg-block">
          <h4 >Course Status</h4>
          <table>
            <tbody>
              <tr>
                <td>
                  <button className="btn btn-light">Unpublish</button>
                </td>
                <td>
                  <button className="btn btn-success">Publish</button>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-light">Import Existing Content</button><br />
          <button className="btn btn-light">Import From Commons</button><br />
          <button className="btn btn-light">Choose Home Page</button><br />
        </div>
    )
}

export default CourseStatus;