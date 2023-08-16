package mark.client;

import Task1.*;
import Task1.ToasterPackage.*;
import org.omg.CORBA.*;

import java.io.*;
import java.util.Scanner;

public class Client
{
    private ORB orb;
    private Toaster toaster;
    
    public void initORB() throws Exception
    {
        // Creates and initialises the ORB.
        orb = ORB.init(new String[0], null);

        // Reads in the IOR from file.
        BufferedReader br =
            new BufferedReader(new FileReader("../../ior_file"));
        String ior = br.readLine();
        br.close();

        // Gets object reference from IOR.
        org.omg.CORBA.Object toaster_ref = orb.string_to_object(ior);
        toaster = ToasterHelper.narrow(toaster_ref);
    }
    
    public Toaster getToaster()
    {
        return toaster;
    }
    
    public void closeORB()
    {
        orb.shutdown(true);
    }
    
    public static void main(String[] args)
    {
        try
        {
            Client client = new Client();
            client.initORB();

            Toaster toaster = client.getToaster();

            Scanner sc = new Scanner(System.in);
            int input = 0;
            while (input > -1)
            {
                input = sc.nextInt();

                try
                {
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
                catch (On_Fire e)
                {
                    System.out.println("Toaster caught on fire!");
                }
            }
            
            client.closeORB();
        }
        catch (Exception e)
        {
            System.out.println("CORBA exception: " + e);
            e.printStackTrace(System.out);
        }
    }
}
