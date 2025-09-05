import { Resolver, Tool } from '@nestjs-mcp/server';

import {z} from 'zod';

@Resolver('workspace') // No @Injectable()
export class MathResolver {
 
    @Tool({ name: 'sum',description:"user to perform sum to two numbers" ,paramsSchema:{
        a:z.number(),
        b:z.number(),
    }})
    sumTool({a,b}) {
        console.log('@@@@@@@@',a,b);
        return { content: [{ type: 'text', text: a+b }] };
    }
} 