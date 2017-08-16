### GraphQL Basics

Based on the resource : Building Scalable APIs with GraphQL By Samer Buna.

####  Example type for https://www.graphqlhub.com


```javascript

query Test {                         
   graphQLHub
   github {
    user(username:"drklrd") {
      id
      company
      avatar_url
      repos{
        name
      }
    }
    
  }
}

```

**Fields** : Like 'graphQLHub','github','repo'....

**Two types of fields :**
  - scalar (graphQLHub,avatar_url,id,company)
  - complex (github,user,repos)
  - 'repos' represent list of objects


```javascript

query ListOfCommits {
  github {
    repo(name:"graphql",ownerUsername:"facebook"){
      commits {
        message
        date
      }
    }
  }
}

```


####  What are resolver functions ? Try to find answer

####  Scalar fields are the basic types in GraphQl schema(they are primitive types)

### Variables

```javascript

query Test($currentUserName: String!) {
   graphQLHub
   github {
    user(username: $currentUserName) {
      id
      company
      avatar_url
      repos{
        name
      }
    }
    
  }
}

```

#### and in query variables : 

```javascript

{
  "currentUserName": "drklrd"
}
```

### Directives: 
Directives can be used to  alter the GraphQL runtime execution

```javascript

query Test(
  $currentUserName: String!,
  $includeRepos : Boolean!
) {
   graphQLHub
   github {
    user(username: $currentUserName) {
      id
      company
      avatar_url
      repos @include(if:$includeRepos){
        name
      }
    }
    
  }
}

``` 

#### and in query variables : 

```javascript


{
  "currentUserName": "drklrd",
  "includeRepos": false  
}

```

### Aliases :

```javascript

query Test(
  $currentUserName: String!,
  $includeRepos : Boolean!
) {
   graphQLHub
   github {
    user(username: $currentUserName) {
      githubid:id
      company
      avatar_url
      repos @include(if:$includeRepos){
        name
      }
    }
    
  }
} 

```

#### and also ...

```javascript
query Test(
  $user1: String!,
  $user2 : String!
) {
   graphQLHub
   github {
    user1 : user (username: $user1) {
      githubid:id
      company
      avatar_url
    }
    user2 : user (username: $user2) {
      githubid:id
      company
      avatar_url
    }
    
  }
} 
```

#### with query variables 

```javascript
{
  "user1": "drklrd",
  "user2": "github"
}
```



### Fragments

```javascript


query Test(
  $user1: String!,
  $user2 : String!
) {
   graphQLHub
   github {
    user1 : user (username: $user1) {
      ...UserInfo
    }
    user2 : user (username: $user2) {
      ...UserInfo
    }
    
  }
} 

fragment UserInfo on GithubUser {
  id
  company
  avatar_url
}

```

### Inline fragments

```javascript

query Test {
  github{
    repo(name:"graphql", ownerUsername:"facebook"){
      commits{
        message
        author{
          ... on GithubUser{
            login
          }
          ... on GithubCommitAuthor{
            email
          }
        }
      }
    }
  }
}

```

### Mutations

```javascript

mutation AddResource($input : CreateLinkInput!){
  createLink(input : $input){
    linkEdge{
      node {
        id
      }
    }
  }
}
```

#### and query variables

```javascript

{
  "input" : {
    "title" : "GraphQlHub",
    "url" : "https://www.graphqlhub.com",
    "clientMutationId" : 12
  }
}

```

### Querying unions

```javascript

{
  me(key:"0000"){
    email
    fullName
    activities{
      ... on Contest{
        title
      }
      ... on Name {
        label
      }
    }
    
  }
}

```