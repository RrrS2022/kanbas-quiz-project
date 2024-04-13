const multiply = (a: number, b: number) => a * b;

function ImpliedReturn() {
    const fourTimesFive = multiply(4, 5);
    console.log(fourTimesFive);

    return (
     <>
      <h3>Implied return</h3>
      fourTimesFive = {fourTimesFive}<br />
      multiply(3, 1) = {multiply(3, 1)}<br />
     </>
    )}


export default ImpliedReturn;