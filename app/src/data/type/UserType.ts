import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const UserType = new ObjectType({
    name: 'User',
    fields: {
        id: { type: new NonNull(ID) },
        email: { type: StringType },
    },
});

export default UserType;