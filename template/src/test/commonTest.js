
test('data 2017-06-26', () => {
        const { dateFormat } = require('../common/date');
        expect(dateFormat('2017-06-26 08:04:55', 'yyyy-MM-dd')).toBe('2017-06-26');
    }
);

test('cookie id dasdasdasdadasdas', () => {
        const { Cookie } = require('../common/cookie');
        Cookie.setCookie('id', 'dasdasdasdadasdas');
        expect(Cookie.getCookie('id')).toBe('dasdasdasdadasdas');
    }
);
