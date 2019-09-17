// x and y are arrays of x and y values of corresponding (x, y) pairs
// n is what degree of polynomial to fit
const polyfit = (x, y, n) => {
  // Input validation:
  // x and y length have to be the same
  if (x.length ^ y.length)
    throw "x and y don't have the same number of elements!";
  // n has to be less than number of points
  if (n >= x.length)
    throw "Cannot fit polynomial of degree " + n + " for " + x.length + "points!";

  // Helper functions

  // Transpose a matrix
  // Reference:
  // https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
  const transpose = m => m[0].map((_, i) => m.map(r => r[i]));

  // Multiply 2 matrices
  // Reference:
  // https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
  const multiply = (a, b) =>
    Array(a.length).fill(0).map(_ => Array(b[0].length).fill(0)) // Initialize result
      .map((r, i) =>
        r.map((v, j) =>
          a[i].reduce((s, e, k) => s + e * b[k][j], 0)
        )
      );
  
  // rref
  // Reference:
  // https://github.com/substack/rref/blob/master/index.js
  const rref = a => {
    const rows = a.length, columns = a[0].length;
    
    let lead = 0;
    for (let k = 0; k < rows; k++) {
        if (columns <= lead) return;
        
        let i = k;
        while (!a[i][lead]) {
            i++;
            if (rows === i) {
                i = k;
                if (columns === ++lead) return;
            }
        }
        let irow = a[i], krow = a[k];
        a[i] = krow, a[k] = irow;
         
        let val = a[k][lead];
        for (let j = 0; j < columns; j++)
            a[k][j] /= val;
         
        for (let i = 0; i < rows; i++) {
            if (i === k) continue;
            val = a[i][lead];
            for (let j = 0; j < columns; j++)
                a[i][j] -= val * a[k][j];
        }
        lead++;
    }
    return a;
  }


  // Setup matrix A
  const AT = [];

  // Each column in A is x ** i
  for (let i = 0; i <= n; i++)
    AT.push(x.map(v => v ** i));

  // Multiply A_transpose by A
  const A = transpose(AT);
  const ATA = multiply(AT, A);

  // Setup matrix b
  const b = y.map(v => [v]);

  // Multiply A transpose by b
  const ATb = multiply(AT, b);

  const reduced = 
    rref(                                  // Convert to rref
      ATA.map((r, i) => [...r, ATb[i][0]]) // the resulting system
    );

  // Extract the coefficients, which are at the last column
  return reduced.map(r => r[r.length - 1]);
}