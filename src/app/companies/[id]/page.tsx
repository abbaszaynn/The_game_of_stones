
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
import { Briefcase, Download, Globe, Mail, MapPin, Phone, User, Gem, Layers } from 'lucide-react';
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
                  <h3 className="font-semibold text-foreground text-xl mt-4">Founding and Incorporation</h3>
                  <p className="text-muted-foreground">{company.history}</p>
                  <h3 className="font-semibold text-foreground text-xl mt-4">Vision and Early Objectives</h3>
                  <p className="text-muted-foreground">The company’s core vision is to explore, extract, and process a diverse array of minerals and ores, including precious and base metals, industrial minerals, and construction materials. Its registered mission indicates a focus on responsible resource development, local economic empowerment, and the creation of sustainable value through innovative mining practices.</p>
                  <h3 className="font-semibold text-foreground text-xl mt-4">Growth and Development</h3>
                  <p className="text-muted-foreground">DURR MINE & MINERALS (PRIVATE) LIMITED was capitalized at 2,000,000 PKR with shareholders each subscribing 10,000 ordinary shares, symbolizing a commitment to long-term investment and steady expansion. The company was structured with both subscribers/directors being professionally active in business—bringing management expertise and entrepreneurial energy to the venture.</p>
                  <h3 className="font-semibold text-foreground text-xl mt-4">Operations and Activities</h3>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                    <li>Mineral exploration, extraction, and processing of a variety of ores and valuable materials.</li>
                    <li>Handling and transportation of minerals for local and international markets.</li>
                    <li>Acting as agents, consultants, contractors, and distributors in the mining sector.</li>
                  </ul>
                   <h3 className="font-semibold text-foreground text-xl mt-4">Commitment to Community and Compliance</h3>
                  <p className="text-muted-foreground">DURR MINE & MINERALS (PRIVATE) LIMITED adheres to Pakistan’s legal and regulatory frameworks for corporate responsibility. The company’s founding declaration indicates that all relevant compliance, including beneficial ownership transparency, and legal formalities, was strictly observed at incorporation.</p>
                   <h3 className="font-semibold text-foreground text-xl mt-4">Looking Forward</h3>
                  <p className="text-muted-foreground">Building on the geological promise of Gilgit-Baltistan, the company’s leadership envisions sustainable growth, community engagement, and technological advancement as keys to expanding operations. DURR MINE & MINERALS (PRIVATE) LIMITED aims to be a leading regional player, pursuing excellence in mineral resource development while upholding environmental and ethical standards.</p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-2xl font-semibold text-foreground">Status</CardTitle>
                  <div className="pt-1">
                    <Badge className="bg-green-600 text-white hover:bg-green-600/90">Operational</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <h2 className="text-2xl font-semibold text-foreground mb-3">Projects</h2>
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
                <CardHeader>
                  <CardTitle>Deposits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                      <Gem className="w-5 h-5 text-accent" /> Marble Deposits (Bagicha, Skardu)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2"><strong>Location:</strong> Bagicha, District Skardu, Gilgit-Baltistan</p>
                    <p className="text-sm text-muted-foreground mb-2"><strong>Deposit Type:</strong> Extensive Marble body with significant quartz-rich zones and block/vein formations.</p>
                    <div className="text-sm text-muted-foreground">
                      <p><strong>Dimensions:</strong></p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Sheets/Blocks: 1–4 feet thick; strike length 200–350 meters in various exposures.</li>
                        <li>Strike Continuity: Exposures and blocks observed continuously along strike lengths of 1 to 5 kilometers.</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                      <Layers className="w-5 h-5 text-accent" /> Copper & Polymetallic Deposits (Gultari, Skardu)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2"><strong>Location:</strong> Gultari, Tehsil Gultari, District Skardu, Gilgit-Baltistan</p>
                    <p className="text-sm text-muted-foreground mb-2"><strong>Deposit Type:</strong> Copper ore in polymetallic settings, with iron and silica quartz.</p>
                    <div className="text-sm text-muted-foreground">
                      <p><strong>Ore Body:</strong></p>
                       <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Exposed as mineralized veins; thicknesses from 1–5 feet and visually mapped along strike lengths of 200–350 meters at different locations.</li>
                        <li>Veins and deposits traceable for 3 to 5 kilometers.</li>
                      </ul>
                    </div>
                  </div>
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
                          <CardContent className="flex aspect-[21/9] items-center justify-center p-0">
                            <Image src={src} alt={`Gallery image ${index + 1}`} width={1280} height={548} className="rounded-lg object-cover" data-ai-hint="mining site" />
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
