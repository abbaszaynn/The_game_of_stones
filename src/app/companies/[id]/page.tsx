
import { getCompanyById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Briefcase, Download, Globe, Mail, MapPin, Phone, User } from 'lucide-react';
import Link from 'next/link';

export default async function CompanyDetailPage({ params }: { params: { id: string } }) {
  const company = await getCompanyById(params.id);

  if (!company) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-12">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <Image
            src={company.logoUrl}
            alt={`${company.name} logo`}
            width={128}
            height={128}
            className="rounded-xl border shadow-md"
            data-ai-hint="company logo"
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">{company.name}</h1>
            <p className="mt-2 text-xl text-muted-foreground">{company.tagline}</p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gallery">Multimedia</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="contact">Investor Relations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>About {company.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{company.description}</p>
                  <h3 className="font-semibold text-foreground">Company History</h3>
                  <p className="text-muted-foreground">{company.history}</p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Leadership</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {company.leadership.map((leader, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-secondary">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">{leader.name}</p>
                        <p className="text-sm text-muted-foreground">{leader.title}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-semibold text-foreground">Status</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <Badge className="bg-green-600 text-white hover:bg-green-600/90">Operational</Badge>
                  <h2 className="text-2xl font-semibold text-foreground mt-4 mb-3">Projects</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium text-foreground">Skardu Topaz Project</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium text-foreground">Gultari Project</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
               <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/map">
                  <Globe className="mr-2 h-5 w-5" /> Visit the Mines
                </Link>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Multimedia Gallery</CardTitle>
              <CardDescription>Visuals from our sites and operations.</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Images</h3>
               <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                  {company.images.map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-video items-center justify-center p-0">
                            <Image src={src} alt={`Gallery image ${index + 1}`} width={1280} height={720} className="rounded-lg object-cover" data-ai-hint="mining site" />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <h3 className="text-lg font-semibold mt-8 mb-4">Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {company.videos.map(video => (
                    <div key={video.id}>
                        <p className='font-medium mb-2'>{video.title}</p>
                        <div className="aspect-video rounded-lg overflow-hidden">
                            <iframe
                                src={video.url}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                 ))}
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
           <Card>
            <CardHeader>
                <CardTitle>Document Repository</CardTitle>
                <CardDescription>Download official reports, licenses, and papers.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Download</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {company.documents.map((doc) => (
                        <TableRow key={doc.id}>
                            <TableCell className="font-medium">{doc.title}</TableCell>
                            <TableCell>
                            <Badge variant="outline">{doc.type}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" asChild>
                                    <a href={doc.url} download>
                                        <Download className="h-4 w-4" />
                                        <span className="sr-only">Download</span>
                                    </a>
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
           </Card>
        </TabsContent>
        <TabsContent value="contact" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Investor Relations</CardTitle>
                    <CardDescription>Contact information for investors and media.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {company.investorContacts.map((contact, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-secondary/50">
                            <p className="font-semibold text-lg flex items-center gap-2"><Briefcase className="w-5 h-5 text-accent"/>{contact.name}</p>
                             <div className="mt-4 space-y-2 text-muted-foreground">
                                <p className="flex items-center gap-3">
                                    <Mail className="h-4 w-4"/>
                                    <a href={`mailto:${contact.email}`} className="hover:text-foreground">{contact.email}</a>
                                 </p>
                                <p className="flex items-center gap-3">
                                    <Phone className="h-4 w-4"/>
                                    <a href={`tel:${contact.phone}`} className="hover:text-foreground">{contact.phone}</a>
                                 </p>
                             </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
