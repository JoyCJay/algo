import java.util.*;
 /**
  * dijkstra 是不能计算负权图的。 
    本质上是贪心算法(每一步都是以当前最优选择为前提的)
    下一条路径都是由当前更短的路径派生出来的更长的路径。不存在回溯的过程。 
  */
public class dijkstra2 {
	private Queue visited;
	int[] distance;
	
	public dijkstra2(int len) {
		visited=new LinkedList();
		distance=new int[len];
		
	}
	
	private int getIndex(Queue q,int[] dis)
	{
		int k=-1;
		int min_num=Integer.MAX_VALUE;
		for(int i=0;i<dis.length;i++)
		{
			if(!q.contains(i))
			{
				if(dis[i]<min_num)
				{
					min_num=dis[i];
					k=i;
				}
			}
		}
		return k;
	}
	public void go(int[][] weight,Object[] str,int v)
	{
		HashMap path = new HashMap();
		for(int i=0;i<str.length;i++)
			path.put(i, "");
		
		//初始化路径长度数组distance
		for(int i=0;i<str.length;i++)
		{
			path.put(i, path.get(i)+""+str[v]);
			if(i==v)
				distance[i]=0;
			else if(weight[v][i]!=-1)
			{
				distance[i]=weight[v][i];
				path.put(i, path.get(i)+"-->"+str[i]);
			}
			
			else
				distance[i]=Integer.MAX_VALUE;
		}
		visited.add(v);
		while(visited.size()<str.length)
		{
			int k=getIndex(visited,distance);//获取未访问点中距离源点最近的点
			visited.add(k);
			if(k!=-1)
			{
				
				for(int j=0;j<str.length;j++)
				{
					if(weight[k][j]!=-1)//判断k点能够直接到达的点
					{
						//通过遍历各点，比较是否有比当前更短的路径，有的话，则更新distance，并更新path。
						if(distance[j]>distance[k]+weight[k][j])
						{
							distance[j]=distance[k]+weight[k][j];
							path.put(j, path.get(k)+"-->"+str[j]);					
						}
					}
					
				}
			}
        }
        
        //Output
		for(int h=0;h<str.length;h++)
		{
			System.out.printf(str[v]+"-->"+str[h]+":"+distance[h]+" ");
			if(distance[h]==Integer.MAX_VALUE)
				System.out.print(str[v]+"-->"+str[h]+"之间没有可通行路径");
			else
				System.out.print(str[v]+"-"+str[h]+"之间有最短路径，具体路径为："+path.get(h).toString());
			System.out.println();
		}
		
	}

    public static void main(String[] args) {
        int[][] weight= {
            {0,-1,10,-1,30,100},
            {-1,0,5,-1,-1,-1},
            {-1,-1,0,50,-1,-1},
            {-1,-1,-1,0,-1,10},
            {-1,-1,-1,20,0,60},
            {-1,-1,-1,-1,-1,0}
        };
		String[] str= {"V1","V2","V3","V4","V5","V6"};
		int len=str.length;
		dijkstra2 exemple =new dijkstra2(len);
		//依次让各点当源点，并调用dijkstra函数
		for(int i=0;i<str.length;i++)
		{
            exemple.go(weight, str, i);
            System.out.println(i+"finish");
		}
    }
}
