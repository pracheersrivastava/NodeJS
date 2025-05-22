process.stdin.on('data', (chunk) => {
    const input = chunk.toString().trim();
    if(input === 'exit') {
        process.exit();
    }
    try{
        const value = eval(input);
        console.log(value);
    } catch (error) {
        console.error('I dont know how to do that.');
    }

    process.stdout.write("Enter a simple equation: ");
});
process.stdout.write("Enter a simple equation: ");