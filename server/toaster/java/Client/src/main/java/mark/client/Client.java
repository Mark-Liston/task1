package mark.client;

import Task1.*;
import Task1.ToasterPackage.*;
import org.omg.CORBA.*;

import java.io.*;
import java.util.Scanner;

public class Client
{
    public static void main(String[] args)
    {
        try
        {
            // Creates and initialises the ORB.
            ORB orb = ORB.init(args, null);

            // Reads in the IOR from file.
            BufferedReader br =
                new BufferedReader(new FileReader("../../ior_file"));
            String ior = br.readLine();

            // Gets object reference from IOR.
            org.omg.CORBA.Object toaster_ref = orb.string_to_object(ior);
            Toaster toaster = ToasterHelper.narrow(toaster_ref);
            
            Scanner sc = new Scanner(System.in);
            int input = 0;
            while (input > -1)
            {
                input = sc.nextInt();
                
                switch (input)
                {
                    case 1:
                        if (toaster.insert_toast())
                            System.out.println("Inserted toast.");
                        break;
                    case 2:
                        if (toaster.eject_toast())
                            System.out.println("Ejected toast.");
                        break;
                    case 3:
                        System.out.println("Toast colour: " + toaster.get_toast_colour());
                        break;
                }                    
            }
            
            br.close();
            orb.shutdown(true);
        }
//        catch (On_Fire e)
//        {
//            System.out.println("Toaster caught on fire!");
//        }
        catch (Exception e)
        {
            System.out.println("CORBA exception: " + e);
            e.printStackTrace(System.out);
        }
    }
}
