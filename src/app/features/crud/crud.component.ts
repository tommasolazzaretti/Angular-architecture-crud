import {Component, OnInit} from '@angular/core';
import {Website} from '../../global/model/website';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BlocklistService} from '../../global/services/blocklist.service';

const regExWebsite =
  new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  private id = null;
  crudForm = new FormGroup({
    name: new FormControl('', Validators.required),
    website: new FormControl('',
      [
        Validators.required,
        Validators.pattern(regExWebsite)
      ],
    )
  });

  constructor(private route: ActivatedRoute, private router: Router, private blocklistService: BlocklistService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    const self = this;
    this.route.params.subscribe(params => {
      if (params.id) {
        self.blocklistService.getBlocklist(params.id).subscribe((blocklist: Website) => {
          self.crudForm?.get('name')?.setValue(blocklist.name);
          self.crudForm?.get('website')?.setValue(blocklist.website);
        });
      }
    });

  }

  saveWebsite(): void {
    if (this.crudForm.invalid) {
      this.crudForm.markAsTouched();
    } else {
      const param = this.id ? {id: this.id, ...this.crudForm.value} : this.crudForm.value;
      this.blocklistService.saveOrUpdateElement(param);
      this.router.navigate(['']);
    }
  }

}
