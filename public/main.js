function handleForm(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const body = {
        item: data.get('item'),
        quantity: data.get('quantity'),
    };

    fetch('api/save', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            return res.json().then(err => {
                throw err;
            });
        }
    });
}
