import '../css/RenderWorkout.css';

const renderWorkoutSection = (title, exercises) => {
  return (
    <div>
      <br />
      <h5 className='bg-white text-black text-center p-1 heading'>{title}</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map(([exercise, sets, reps], index) => (
            <tr key={index}>
              <td>{exercise}</td>
              <td>{sets}</td>
              <td>{reps}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default renderWorkoutSection;