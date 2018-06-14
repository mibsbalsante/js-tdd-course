const FizzBuzz = (num) => {
  let result = '';

  if (num === 0) return 0;

  if (num % 3 === 0) result += 'Fizz';
  if (num % 5 === 0) result += 'Buzz';

  return result || num;
};

export default FizzBuzz;
