function fillStatic() {
    const data = {
        "id": {
            "info": {
                "commands": [
                    "ENDWITH|<br>"
                ],
                "innerHTML": [
                    "149-01 Union Turnpike,",
                    "Flushing, NY 11367",
                    "Open Monday to Friday",
                    "From 9am - 7pm",
                    "718-969-3300",
                    "pharmacy@avonora.com",
                    "Supervising Pharmacist: Debbora Farazmand"
                ],
            },
            "main-logo": {
                "src": ["/media/images/logo.png"]
            },
            "logo-text": {
                //"innerText": ["Avonora Pharmacy"]
            }
        }
    }

    // Function to process each property and add it to the DOM
    function applyDataToElement(element, properties) {
        let commands = [];
        if (properties.commands) {
            commands = properties.commands.map(cmd => cmd.split('|'));
        }

        Object.keys(properties).forEach(property => {
            if (property === 'commands') {
                // Skip the commands property since we already extracted it
                return;
            }

            let finalHtml = "";
            properties[property].forEach(content => {
                // Apply commands to the content
                commands.forEach(command => {
                    switch (command[0]) {
                        case 'ENDWITH':
                            content += command[1];
                            break;
                        // Add other command cases as needed
                        default:
                            break;
                    }
                });
                finalHtml += content + '\n';
            });

            // Set the final processed content to the element property
            element[property] = finalHtml;
        });
    }

    // Iterate through the data object and apply changes to the DOM
    Object.keys(data).forEach(idOrClass => {
        const elements = data[idOrClass];
        Object.keys(elements).forEach(secondaryElement => {
            const properties = elements[secondaryElement];
            const element = document.getElementById(secondaryElement) || document.getElementsByClassName(secondaryElement)[0];
            if (element) {
                applyDataToElement(element, properties);
            }
        });
    });
}
function handleDynamic() {
    // Sign
    time = getTime()[1]
    day = getTime()[0]
    let sign = document.getElementById('sign')
    if (time > 700 && time < 1900 && day < 6){
        sign.innerHTML = 'We are <b style="color: green">OPEN</b>!'
    } else {
        sign.innerHTML = 'Sorry, we are <b style="color: red">CLOSED</b>'
    }
    // Accept
    const accepting = ['Visa', 'Discover']
}
function getTime() {
    const date = new Date();

    // Convert local time to UTC time
    const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
    
    // Get EST offset in milliseconds (UTC - 5 hours)
    const estOffset = -5 * 60 * 60000; // EST is UTC-5

    // Create a new Date object for EST
    const estDate = new Date(utcTime + estOffset);
    
    // Get day of the week, hours, and minutes
    const dayOfWeek = estDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hours = estDate.getHours(); // Hours in 24-hour format
    const minutes = estDate.getMinutes(); // Minutes

    // Format with leading zeros if necessary
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Return the tuple (dayOfWeek, formattedTime)
    return [dayOfWeek, `${formattedHours}${formattedMinutes}`];
}

fillStatic()
handleDynamic()
setTimeout(handleDynamic, 1000)