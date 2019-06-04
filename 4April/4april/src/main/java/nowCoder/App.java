package nowCoder;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        //".*?(?=\\()"
        Pattern pattern = Pattern.compile(".*?(?=\\()");
         
        Matcher matcher = pattern.matcher("北京市(海淀区)(朝阳区)(西城区)");
         
        if(matcher.find())
        {
            System.out.println(matcher.group(0));
        }
        else
        {
            System.out.println(matcher.group(0));
        }
    }
}
