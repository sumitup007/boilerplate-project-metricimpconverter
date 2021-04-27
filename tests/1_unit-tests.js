const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('Whole number input',(done)=>{
        let input = '32L';
        assert.equal(convertHandler.getNum(input),32);
        done();
    });
    test('Decimal number input',(done)=>{
        let input = '32.2L';
        assert.equal(convertHandler.getNum(input),32.2);
        done();
    });
    test('fractional input',(done)=>{
        let input = '1/32L';
        assert.equal(convertHandler.getNum(input),1/32);
        done();
    });
    test('fractional input with a decimal',(done)=>{
        let input = '1/3.2L';
        assert.equal(convertHandler.getNum(input),1/3.2);
        done();
    });
    test('error on a double-fraction',(done)=>{
        let input = '1/3/2L';
        assert.equal(convertHandler.getNum(input),undefined);
        done();
    });
    test('no numerical input',(done)=>{
        let input = 'L';
        assert.equal(convertHandler.getNum(input),1);
        done();
    });
    suite("Function convertHandler.getUnit(input)",()=>{
        test('for each valid unit inputs',(done)=>{
            let input = ['L','gal','mi','km','lbs','kg','GAL','l','MI','KM','LBS','KG'];
            let output = ['L','gal','mi','km','lbs','kg','gal','L','mi','km','lbs','kg'];
            input.forEach((ele, index)=>{
                assert.equal(convertHandler.getUnit(ele),output[index])
            });
            done();
        });

        test('invalid input unit',(done)=>{
            let input = 'Ls';
            assert.equal(convertHandler.getUnit(input),undefined);
            done();
        });
    });
    suite("Function convertHandler.getReturnUnit(input)",()=>{
        test('for each valid unit inputs',(done)=>{
            let input = ['gal','l','km','mi','kg','lbs'];
            let output = ['L','gal','mi','km','lbs','kg'];
            input.forEach((ele, index)=>{
                assert.equal(convertHandler.getReturnUnit(ele),output[index])
            });
            done();
        });
    });
    suite("Function convertHandler.spellOutUnit(input)",()=>{
        test('for each valid unit inputs',(done)=>{
            let input = ['gal','l','km','mi','kg','lbs'];
            let output = ['gallons','liters','kilometers','miles','kilograms','pounds'];
            input.forEach((ele, index)=>{
                assert.equal(convertHandler.spellOutUnit(ele),output[index])
            });
            done();
        });
    });
    suite("Function convertHandler.convert(num, unit)",()=>{
        test('Gal to L',(done)=>{
            let input = [5,"gal"];
            let output = 18.9271;
            assert.approximately(
                convertHandler.convert(input[0],input[1]),
                output,
                0.1
            )
            done();
        });
        test('L to Gal',(done)=>{
            let input = [18.9271,"L"];
            let output = 5;
            assert.approximately(
                convertHandler.convert(input[0],input[1]),
                output,
                0.1
            )
            done();
        });
        test('Mi to Km',(done)=>{
            let input = [3.1,"mi"];
            let output = 5;
            assert.approximately(
                convertHandler.convert(input[0],input[1]),
                output,
                0.1
            )
            done();
        });
        test('Km to mi',(done)=>{
            let input = [5,"km"];
            let output = 3.1;
            assert.approximately(
                convertHandler.convert(input[0],input[1]),
                output,
                0.1
            )
            done();
        });
        test('lbs to kg',(done)=>{
            let input = [5,"lbs"];
            let output = 2.26796;
            assert.approximately(
                convertHandler.convert(input[0],input[1]),
                output,
                0.1
            )
            done();
        });
        test('kg to lbs',(done)=>{
            let input = [2.26796,"kg"];
            let output = 5;
            assert.approximately(
                convertHandler.convert(input[0],input[1]),
                output,
                0.1
            )
            done();
        });
    });
});