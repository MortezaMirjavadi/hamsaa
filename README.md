# hamsaa

Front-End developer test

# **Coding challenge or existing code?**

The coding challenge is optional if you already have some code that you’re proud of and can share with us.

## **Existing code**

If you have existing code, please follow the following guidelines:

- Include a link to the hosted repository (e.g. Github, Bitbucket…). We cannot review archives or single files.
- The repo should include a README that follows the principles described below. In particular, please make sure to include high-level explanation about what the code is doing.
- Ideally, the code you’re providing:
  - Has been written by you alone. If not, please tell us which part you wrote and are most proud of in the README.
  - Is leveraging web technologies.
  - Is deployed and hosted somewhere.

## **Readme**

Regardless of whether it’s your own code or our coding challenge, write your README as if it was for a production service. Include the following items:

- Description of the problem and solution.
- Whether the solution focuses on back-end, front-end or if it’s full stack.
- Reasoning behind your technical choices, including architectural.
- Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project.
- Link to other code you’re particularly proud of.
- Link to your resume or public profile.
- Link to to the hosted application where applicable.

## **How we review**

Your application will be reviewed by at least two of our engineers. We do take into consideration your experience level.

**We value quality over feature-completeness**. It is fine to leave things aside provided you call them out in your project’s README. The goal of this code sample is to help us identify what you consider production-ready code. You should consider this code ready for final review with your colleague, i.e. this would be the last step before deploying to production.

The aspects of your code we will assess include:

- **Architecture**: how clean is the separation of concerns.
- **Clarity**: does the README clearly and concisely explains the problem and solution? Are technical tradeoffs explained?
- **Correctness**: does the application do what was asked? If there is anything missing, does the README explain why it is missing?
- **Code quality**: is the code simple, easy to understand, and maintainable? Are there any code smells or other red flags? Does object-oriented code follows principles such as the single responsibility principle? Is the coding style consistent with the language’s guidelines? Is it consistent throughout the codebase?
- **Testing**: how thorough are the automated tests? Will they be difficult to change if the requirements of the application were to change? Are there some unit and some integration tests?
  - We’re not looking for full coverage (given time constraint) but just trying to get a feel for your testing skills.
- **Technical choices**: do choices of libraries, databases, architecture etc. seem appropriate for the chosen application?

Bonus point (those items are optional):

- **Scalability**: will technical choices scale well? If not, is there a discussion of those choices in the README?
- **Production-readiness**: does the code include monitoring? logging? proper error handling?

## Coding Challenge Guidelines

If you don’t have code to share, you can work on our coding challenge described below.

Please organize, design, test, document and deploy your code as if it were going into production, then send us a link to the hosted repository (e.g. Github, Bitbucket…).

As this is a highly technical role this second phase will be a technical assessment the main objective of this test is to assess your skills in the following areas:

- Analytical thinking
- Approach to problem-solving
- Attention to details and professionalism
- Ability to write minimal, clean and brief code while adhering to best practices and separation
  of concerns
- Reusable components

**Assessment - Minimal Dashboard to add shops to favorite list**

The task is to create a minimal app which consists of register, login, shops list and
dashboard pages. You need to create two simple page for user authentication (Sign up, Log in). In the app's home page, you will show the list of shops (from the API), and allow the user to see and interact with "Add To Favorites" button if the user is logged in. Once user adds some of the shops to his favorites, he then should be able to remove those selected shops from the favorites as well.

Finally, the user can view his favorite shops in his dashboard. Also he must be able to log out from his dashboard.

## Things to Consider:

- You need to save the user token and his favorite shops into Context.
- User must can both add to and remove from his favorite shops and you need to implement actions to update Context.

### The App Routes(React JS):

```bash
GET /shop?page=1
> Preset list of shops here.
> Authenticated: true
```

```bash
POST /account/login
> Authenticated: false
```

```bash
POST /account/register
> Authenticated: false
```

### Rest API Routes:

```bash
BASE_URL: https://challenge.hamsaa.ir/api
```

```bash
POST /account/login
> fields: {email, password}
> returns: token
> authenticated: false
```

```bash
POST /account/register
> fields: { email, password }
> authenticated: false
```

```bash
GET /shop?page={page_number}
> returns: list of shops
> authenticated: true
```

- A note about API calls:
  All the API Routes that are marked as `authenticated: true` require user token. You need to store user's token in the Context to send via each call. For `authenticated: false` you should not send the user token as they are public requests.
  Required fields in each call is marked with `fields: {}`  


### Required Technology stack:

- React Framework
- Functional components and Hooks
- Context API for managing global states
- React Router DOM for managing routes. (for React JS)
- React Navigation v5 or later. (for React Native)
- Write tests for the core functionality of the application. You can ignore signup/signin routes.
