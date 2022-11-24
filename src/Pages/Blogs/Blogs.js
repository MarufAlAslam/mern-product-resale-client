import React from 'react';
import diff from './diff.png'
import './Blogs.css';

const Blogs = () => {
    return (
        <div className='py-10 lg:w-5/6 w-full mx-auto'>
            <h1 className='text-4xl font-bold text-center'>Blogs</h1>

            <div className='collapses'>
                <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-blue-800 my-4">
                    <div className="collapse-title text-xl font-medium">
                        What are the different ways to manage a state in a React application?
                    </div>
                    <div className="collapse-content">
                        <p>
                            There are three ways to manage a state in a React application. They are:
                        </p>
                        <ol>
                            <li>useState</li>
                            <li>useReducer</li>
                            <li>useContext</li>
                        </ol>
                    </div>
                </div>
                <div tabIndex={1} className="collapse collapse-plus border border-base-300 bg-blue-800 my-4">
                    <div className="collapse-title text-xl font-medium">
                        How does prototypical inheritance work?
                    </div>
                    <div className="collapse-content">
                        <p>
                            Prototypical inheritance is a way of creating objects in JavaScript. It is a way of creating objects that inherit features from other objects. It is a way of creating objects that inherit features from other objects.
                        </p>
                    </div>
                </div>
                <div tabIndex={2} className="collapse collapse-plus border border-base-300 bg-blue-800 my-4">
                    <div className="collapse-title text-xl font-medium">
                        What is a unit test? Why should we write unit tests?

                    </div>
                    <div className="collapse-content">
                        <p>
                            The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                        </p>
                        <p className='font-bold mt-4'>
                            Why?
                        </p>
                        <ul className='mt-4'>
                            <li>
                                1. Unit tests save time and money. Usually, we tend to test the happy path more than the unhappy path. If you release such an app without thorough testing, you would have to keep fixing issues raised by your potential users. The time to fix these issues could’ve been used to build new features or optimize the existing system. Bear in mind that fixing bugs without running tests could also introduce new bugs into the system.
                            </li>
                            <li>
                                2. Well-written unit tests act as documentation for your code. Any developer can quickly look at your tests and know the purpose of your functions. This is especially useful when you have a large codebase and you need to onboard new developers.
                            </li>
                            <li>
                                3. Unit tests help you refactor your code. If you have a well-written test suite, you can refactor your code without worrying about breaking it. This is because you can run your tests after every change you make to your code. If your tests pass, you can be sure that your code is working as intended.
                            </li>
                            <li>
                                4. Unit tests help you catch bugs early. If you have a well-written test suite, you can refactor your code without worrying about breaking it. This is because you can run your tests after every change you make to your code. If your tests pass, you can be sure that your code is working as intended.
                            </li>
                            <li>
                                5. It simplifies the debugging process.
                            </li>
                        </ul>
                    </div>
                </div>
                <div tabIndex={3} className="collapse collapse-plus border border-base-300 bg-blue-800 my-4">
                    <div className="collapse-title text-xl font-medium">
                        React vs. Angular vs. Vue?
                    </div>
                    <div className="collapse-content">
                        <img src={diff} className="diffImg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;