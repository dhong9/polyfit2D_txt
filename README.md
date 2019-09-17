# polyfit2D_txt
This is a JavaScript function that finds the polynomial coefficients that fit the input points. The polynomial degree is also an input value. This function will work in Node.js and in Chrome browser. Also note that this function fits points in 2D space.
## Usage
The `x` and `y` input must have the same number of elements because for each `x[i]` there has to be an `y[i]`. It's an `(x[i], y[i])` pair. Then `n` is the polynomial degree to fit with. It's important that `n < x.length` (or `y.length`).
## Output
The output from the function is an array of polynomial coefficients from lowest degree first. So the first element is the constant coefficient and the last element is `x**n`'s coefficient.
