import chalk from 'chalk';
import { type } from 'os';

/*

Intro:

    Filtering requirements have grown. We need to be
    able to filter any kind of Persons.

Exercise:

    Fix typing for the filterPersons so that it can filter users
    and return User[] when personType='user' and return Admin[]
    when personType='admin'. Also filterPersons should accept
    partial User/Admin type according to the personType.

Higher difficulty bonus exercise:

    Implement a function `getObjectKeys()` which returns proper type
    for any argument given, so that you don't need to cast it.

    let criteriaKeys = Object.keys(criteria) as (keyof User)[];
    -->
    let criteriaKeys = getObjectKeys(criteria);

Run:

    npm run 5

    - OR -

    yarn -s 5

*/

interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

type Person = User | Admin;
type NoTypePerson = Exclude<Person, 'type'>;
type PartialNoTypePerson<T> = {
    [P in keyof T]? : T[P];
}

const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];

function logPerson(person: Person) {
    console.log(
        ` - ${chalk.green(person.name)}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}
type AdminT = 'admin'
type UserT = 'user'
function filterPersons(persons: Person[], personType: AdminT, criteria: PartialNoTypePerson<NoTypePerson>) :  Admin[];
function filterPersons(persons: Person[], personType: UserT, criteria: PartialNoTypePerson<NoTypePerson>) :  User[];
function filterPersons(persons: Person[], personType: AdminT | UserT, criteria: PartialNoTypePerson<NoTypePerson>) :  any[] {
    const result: any[] =  persons
    .filter((person) => person.type === personType)
    .filter((person) => {
        let criteriaKeys = Object.keys(criteria) as (keyof PartialNoTypePerson<NoTypePerson>)[];
        return criteriaKeys.every((fieldName) => {
            return person[fieldName] === criteria[fieldName];
        }) ;
    })
    if(personType == 'user') return result as User[];
    else return result as Admin[];
}


let usersOfAge23: User[] = filterPersons(persons, 'user', { age: 23 });
let adminsOfAge23: Admin[] = filterPersons(persons, 'admin', { age: 23 });

console.log(chalk.yellow('Users of age 23:'));
usersOfAge23.forEach(logPerson);

console.log();

console.log(chalk.yellow('Admins of age 23:'));
adminsOfAge23.forEach(logPerson);

// In case if you are stuck:
// https://www.typescriptlang.org/docs/handbook/functions.html#overloads
